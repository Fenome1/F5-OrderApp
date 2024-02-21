using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Order.Api.Controllers.Base;
using Order.Application.Features.GuestOrders.Commands.Create;
using Order.Application.Features.Guests.Commands.Create;

namespace Order.Api.Controllers;

public class GuestController : BaseController
{
    [HttpPost]
    [AllowAnonymous]
    [Route(nameof(CreateOrder))]
    public async Task<ActionResult<int>> CreateOrder([FromBody] CreateGuestOrderCommand command)
    {
        /*try
        {*/
            return Created(string.Empty, await Mediator.Send(command));
        /*}
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }*/
    }
}