using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Order.Api.Controllers.Base;
using Order.Application.Features.Users.Commands.Create;
using Order.Application.Features.Users.Commands.Update;
using Order.Application.Features.Users.Queries;
using Order.Application.ViewModels;

namespace Order.Api.Controllers;

public class UserController : BaseController
{
    [HttpPost("Register", Name = "Register")]
    [AllowAnonymous]
    public async Task<ActionResult<int>> Register([FromBody] CreateUserCommand command)
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

    [HttpPut("Update", Name = "Update")]
    [Authorize]
    public async Task<ActionResult<UserViewModel>> Update([FromBody] UpdateUserCommand command)
    {
        try
        {
            return Ok(await Mediator.Send(command));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [HttpGet]
    [Route("{userId}")]
    public async Task<ActionResult<UserViewModel>> Get(int userId)
    {
        try
        {
            return Ok(await Mediator.Send(new GetUserQuery { UserId = userId }));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}