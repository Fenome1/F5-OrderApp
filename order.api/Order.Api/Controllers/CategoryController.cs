using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Order.Api.Controllers.Base;
using Order.Application.Features.Categories.Queries.List;
using Order.Application.ViewModels;
using Order.Core.Models;

namespace Order.Api.Controllers;

public class CategoryController : BaseController
{
    [HttpGet]
    public async Task<ActionResult<List<CategoryViewModel>>> Get()
    {
        try
        {
            return Ok(await Mediator.Send(new ListCategoriesQuery()));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}