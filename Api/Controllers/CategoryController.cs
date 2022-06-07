using System.Security.Claims;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet]
        public async Task<IActionResult> GetCategory()
        {
            var response = await _categoryService.GetUserCategory(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return response.IsSuccess ? Ok(response) : BadRequest(response);
        }
    }
}