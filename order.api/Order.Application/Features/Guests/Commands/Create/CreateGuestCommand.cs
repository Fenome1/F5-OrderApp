using MediatR;
using Order.Application.Common.Mappings;
using Order.Core.Models;

namespace Order.Application.Features.Guests.Commands.Create;

public class CreateGuestCommand : IRequest<int>, IMapWith<Guest>
{
    public string Email { get; set; }
}