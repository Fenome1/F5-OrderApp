using AutoMapper;
using Moq;
using Moq.EntityFrameworkCore;
using Order.Application.Features.Users.Commands.Update;
using Order.Core.Models;
using Order.Persistence.Context;
using Order.Tests.Common;

namespace Order.Tests.Users.Commands;

public class UpdateUserCommandHandlerTests
{
    [Fact]
    public async Task UpdateUserCommandHandler_Success()
    {
        // Arrange
        // Создание мока контекста базы данных
        var contextMock = new Mock<OrderDbContext>();

        // Инициализация маппера через DI контейнер
        var mapper = TestContainer.Resolve<IMapper>();

        // Создание существующего пользователя для использования в тесте
        var existingUser = new User
        {
            UserId = 1,
            Email = "fenome1@mail.ru",
            FirstName = "Михаил"
        };

        // Создание команды обновления пользователя с новыми данными
        var updateUserCommand = new UpdateUserCommand
        {
            UserId = 1,
            Email = "fenome2@mail.ru",
            FirstName = "Сергей",
            SecondName = "Силенок"
        };

        // Создание экземпляра обработчика команды обновления пользователя
        var commandHandler = new UpdateUserCommandHandler(mapper, contextMock.Object);

        // Act
        // Настройка мока контекста БД для возвращения списка пользователей
        contextMock.Setup(c => c.Users)
            .ReturnsDbSet(new List<User>
            {
                existingUser
            });

        // Вызов метода Handle для обработки команды обновления пользователя
        var result = await commandHandler.Handle(updateUserCommand, CancellationToken.None);

        // Assert
        // Проверка результатов обработки команды на соответствие ожидаемым значениям
        Assert.NotNull(result);
        Assert.Equal(updateUserCommand.UserId, result.UserId);
        Assert.Equal(updateUserCommand.Email, result.Email);
        Assert.Equal(updateUserCommand.FirstName, result.FirstName);
        Assert.Equal(updateUserCommand.SecondName, result.SecondName);
    }
}