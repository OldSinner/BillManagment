using System.Globalization;
using Api.Data;
using Api.Interfaces;
using Api.Models;
using Api.Models.Dtos.Bill;
using Api.Models.Dtos.Stats;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class StatisticService : IStatisticService
    {
        private readonly Context _context;
        private readonly ILogger<StatisticService> logger;

        public StatisticService(Context context, ILogger<StatisticService> logger)
        {
            _context = context;
            this.logger = logger;
        }

        public async Task<ServiceResponse<DashboardModel>> GetDashboard(string userId)
        {
            Guid userGuid;
            var parseSuccess = Guid.TryParse(userId, out userGuid);
            if (!parseSuccess)
            {
                return new ServiceResponse<DashboardModel>()
                {
                    IsSuccess = false,
                    Errors = new List<string>() { "UserId is not valid" }
                };
            }

            var dashboard = new DashboardModel();
            var expens = await _context.Bill.Where(b => b.Owner.Id == userGuid).Where(x => x.Amount < 0).SumAsync(x => x.Amount);
            var income = await _context.Bill.Where(b => b.Owner.Id == userGuid).Where(x => x.Amount > 0).SumAsync(x => x.Amount);
            var expensThisMonth = await _context.Bill.Where(b => b.Owner.Id == userGuid).Where(x => x.CreatedDate.Month == DateTime.Now.Month && x.CreatedDate.Year == DateTime.Now.Year).Where(x => x.Amount < 0).SumAsync(x => x.Amount);
            var incomeThisMonth = await _context.Bill.Where(b => b.Owner.Id == userGuid).Where(x => x.CreatedDate.Month == DateTime.Now.Month && x.CreatedDate.Year == DateTime.Now.Year).Where(x => x.Amount > 0).SumAsync(x => x.Amount);
            var stats = await _context.Bill.Where(b => b.Owner.Id == userGuid && b.CreatedDate.Year == DateTime.Now.Year).GroupBy(x => x.CreatedDate.Month).Select(x => new { Month = x.Key, Amount = x.Sum(y => y.Amount) }).ToListAsync();

            return new ServiceResponse<DashboardModel>()
            {
                IsSuccess = true,
                Data = new DashboardModel()
                {
                    Income = incomeThisMonth,
                    Outcome = expensThisMonth,
                    Balance = income + expens,
                    Monthly = stats.ToDictionary(x => x.Month, x => x.Amount)
                }
            };
        }


    }

}