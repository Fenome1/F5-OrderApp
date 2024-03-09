using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Order.Api.Controllers.Base;
using Order.Application.Features.Orders.Commands.Create.ByGuest;
using Order.Application.Features.Orders.Commands.Create.ByUser;
using Order.Application.Features.Orders.Commands.Delete;
using Order.Application.Features.Orders.Queries.Get;
using Order.Application.ViewModels;
using Order.Application.ViewModels.Base;

namespace Order.Api.Controllers;

public class OrderController : BaseController
{
    [Authorize]
    [HttpPost("User/Create", Name = "UserOrderCreate")]
    public async Task<ActionResult<int>> UserOrderCreate([FromBody] CreateOrderByUserCommand command)
    {
        try
        {
            return Created(string.Empty, await Mediator.Send(command));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [AllowAnonymous]
    [HttpPost("Guest/Create", Name = "GuestOrderCreate")]
    public async Task<ActionResult<int>> GuestOrderCreate([FromBody] CreateOrderByGuestCommand command)
    {
        try
        {
            return Created(string.Empty, await Mediator.Send(command));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    [Route(nameof(Get))]
    public async Task<ActionResult<PagedList<OrderViewModel>>> Get([FromQuery] ListOrdersQuery query)
    {
        try
        {
            return Ok(await Mediator.Send(query));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("Delete/{orderId:int}")]
    public async Task<ActionResult<Unit>> Delete(int orderId)
    {
        try
        {
            return Ok(await Mediator.Send(new DeleteOrderCommand { OrderId = orderId }));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}