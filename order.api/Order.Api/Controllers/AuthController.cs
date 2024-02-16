using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Order.Api.Controllers.Base;
using Order.Application.Common.Exceptions;
using Order.Application.Features.Users.Commands.Login;
using Order.Application.Features.Users.Commands.Logout;
using Order.Application.Features.Users.Commands.Refresh;
using Order.Application.ViewModels;

namespace Order.Api.Controllers;

public class AuthController : BaseController
{
    [HttpPost]
    [AllowAnonymous]
    [Route(nameof(Login))]
    public async Task<ActionResult<AuthResultViewModel>> Login([FromBody] LoginCommand command)
    {
        try
        {
            return Ok(await Mediator.Send(command));
        }
        catch (Exception e)
        {
            return BadRequest($"Ошибка при выходе в аккаунт: {e.Message}");
        }
    }

    [HttpPost]
    [AllowAnonymous]
    [Route(nameof(Refresh))]
    public async Task<ActionResult<AuthResultViewModel>> Refresh(RefreshCommand command)
    {
        try
        {
            return await Mediator.Send(command);
        }
        catch (NotFoundException e)
        {
            return StatusCode(StatusCodes.Status404NotFound, e.Message);
        }
    }

    [HttpPost]
    [Route(nameof(Logout))]
    public async Task<IActionResult> Logout(LogoutCommand command)
    {
        try
        {
            return Ok(await Mediator.Send(command));
        }
        catch
        {
            return BadRequest("Ошибка при выходе из аккаунта");
        }
    }
}