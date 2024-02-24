using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Order.Api.Controllers.Base;
using Order.Application.Features.GuestOrders.Commands.Create;
using Order.Application.Features.GuestOrders.Queries.List;
using Order.Application.ViewModels;
using Order.Application.ViewModels.Base;

namespace Order.Api.Controllers;

public class GuestOrderController : BaseController
{
    [HttpPost]
    [AllowAnonymous]
    [Route(nameof(Create))]
    public async Task<ActionResult<int>> Create([FromBody] CreateGuestOrderCommand command)
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
    public async Task<ActionResult<PagedList<GuestOrderViewModel>>> Get([FromQuery] ListGuestOrdersQuery query)
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
}