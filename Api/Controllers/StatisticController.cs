using System.Security.Claims;
using Api.Interfaces;
using Api.Models.Dtos.Stats;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StatisticController : ControllerBase
    {
        private readonly IStatisticService _statisticService;

        public StatisticController(IStatisticService statisticService)
        {
            _statisticService = statisticService;
        }
        [Authorize]
        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
            var response = await _statisticService.GetDashboard(userId);
            return response.IsSuccess ? Ok(response) : BadRequest(response);
        }

        [Authorize]
        [HttpGet("pdf")]
        public async Task<IActionResult> GetPdf(DateTime from, DateTime to)
        {
            var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
            var response = await _statisticService.GetPdfStats(userId, from, to);
            return response.IsSuccess ? File(response.Data!, "application/octet-stream", "Stats.pdf") : BadRequest(response);
        }
    }
}