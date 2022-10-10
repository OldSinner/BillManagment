
using Api.Models;
using Api.Models.Dtos.Bill;

namespace Api.Interfaces
{
    public interface IStatisticService
    {
        public Task<ServiceResponse<List<BillResponse>>> GetBills(string userId, DateTime from, DateTime to, string categoryId);
        public Task<ServiceResponse<BillsStatistic>> GetSummary(string userId, DateTime from, DateTime to, string categoryId);

    }
}