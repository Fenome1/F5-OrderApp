using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Order.Api.Controllers.Base;
using Order.Application.Features.Users.Commands.Create;

namespace Order.Api.Controllers;

public class UserController : BaseController
{
    [HttpPost("Register", Name = "Register")]
    [AllowAnonymous]
    public async Task<ActionResult<int>> Post([FromBody] CreateUserCommand command)
    {
        try
        {
            return Created(string.Empty, await Mediator.Send(command));
        }
        catch (Exception e)
        {
            return BadRequest($"Ошибка регистрации: {e.Message}");
        }
    }
}