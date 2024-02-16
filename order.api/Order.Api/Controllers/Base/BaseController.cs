using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Order.Api.Controllers.Base;

[ApiController]
[Route("/Api/[controller]")]
public abstract class BaseController : ControllerBase
{
    protected IMediator Mediator => HttpContext.RequestServices.GetRequiredService<IMediator>();
}