using Api.Data;
using Api.Interfaces;
using Api.Models;
using Api.Models.Dtos.Bill;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class StatisticService : IStatisticService
    {
        private readonly Context _context;
        public StatisticService(Context context)
        {
            _context = context;
        }
        public async Task<ServiceResponse<List<BillResponse>>> GetBills(string userId, DateTime from, DateTime to, string categoryId)
        {
            try
            {
                if (to.Hour == 0 && to.Minute == 0 && to.Second == 0)
                {
                    to = to.AddDays(1);
                }
                Guid userGuid;
                var parseSuccess = Guid.TryParse(userId, out userGuid);
                if (!parseSuccess)
                {
                    return new ServiceResponse<List<BillResponse>>()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() { "UserId is not valid" }
                    };
                }

                var user = await _context.Users.Where(x => x.Id == userGuid).FirstOrDefaultAsync();
                if (user == null)
                {
                    return new ServiceResponse<List<BillResponse>>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "User not found" }
                    };
                }

                var query = _context.Bill.Where(x => x.Owner.Id == userGuid && x.CreatedDate >= from && x.CreatedDate <= to).Include(x => x.Category);
                List<Bill> bills;

                if (categoryId != "ALL")
                {
                    Guid CategoryId;
                    parseSuccess = Guid.TryParse(categoryId, out CategoryId);
                    if (!parseSuccess)
                    {
                        return new ServiceResponse<List<BillResponse>>()
                        {
                            IsSuccess = false,
                            Errors = new List<string>() { "CategoryId is not valid" }
                        };
                    };

                    bills = await query.Where(x => x.Category.Id == CategoryId).ToListAsync();
                }
                else
                {
                    bills = await query.ToListAsync();
                }

                return new ServiceResponse<List<BillResponse>>
                {
                    IsSuccess = true,
                    Data = bills.Select(x => x.ToBillResponse()).ToList(),
                    Errors = null
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<List<BillResponse>>()
                {
                    IsSuccess = false,
                    Errors = new List<string>() { ex.Message },
                    Data = null
                };
            }
        }
        public async Task<ServiceResponse<BillsStatistic>> GetSummary(string userId, DateTime from, DateTime to, string categoryId)
        {
            try
            {
                if (to.Hour == 0 && to.Minute == 0 && to.Second == 0)
                {
                    to = to.AddDays(1);
                }
                float sum = 0;
                Guid userGuid;
                var parseSuccess = Guid.TryParse(userId, out userGuid);
                if (!parseSuccess)
                {
                    return new ServiceResponse<BillsStatistic>()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() { "UserId is not valid" }
                    };
                }

                var user = await _context.Users.Where(x => x.Id == userGuid).FirstOrDefaultAsync();
                if (user == null)
                {
                    return new ServiceResponse<BillsStatistic>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "User not found" }
                    };
                }

                var query = _context.Bill.Where(x => x.Owner.Id == userGuid && x.CreatedDate >= from && x.CreatedDate <= to);
                if (categoryId != "ALL")
                {
                    Guid CategoryId;
                    parseSuccess = Guid.TryParse(categoryId, out CategoryId);
                    if (!parseSuccess)
                    {
                        return new ServiceResponse<BillsStatistic>()
                        {
                            IsSuccess = false,
                            Errors = new List<string>() { "CategoryId is not valid" }
                        };
                    };

                    sum = await query.Where(x => x.Category.Id == CategoryId).SumAsync(x => x.Amount);
                }
                else
                {
                    sum = await query.SumAsync(x => x.Amount);
                }

                return new ServiceResponse<BillsStatistic>
                {
                    IsSuccess = true,
                    Data = new BillsStatistic
                    {
                        TotalAmount = sum,
                        CategoryId = categoryId,
                        CategoryName = categoryId == "ALL" ? "ALL" : await _context.Category.Where(x => x.Id == Guid.Parse(categoryId)).Select(x => x.Name).FirstOrDefaultAsync()
                    },
                    Errors = null
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<BillsStatistic>()
                {
                    IsSuccess = false,
                    Errors = new List<string>() { ex.Message },
                    Data = null
                };
            }
        }

    }
}