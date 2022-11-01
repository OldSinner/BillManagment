
using Api.Models;
using Api.Models.Dtos.Bill;
using Api.Models.Dtos.Stats;

namespace Api.Interfaces
{
    public interface IStatisticService
    {
        Task<ServiceResponse<DashboardModel>> GetDashboard(string userId);
    }
}