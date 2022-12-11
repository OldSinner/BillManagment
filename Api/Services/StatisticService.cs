using System.Globalization;
using api.Configuration;
using Api.Data;
using Api.Interfaces;
using Api.Models;
using Api.Models.Dtos.Bill;
using Api.Models.Dtos.Stats;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class StatisticService : IStatisticService
    {
        private readonly Context _context;
        private readonly ILogger<StatisticService> logger;
        private readonly IConverter _converter;

        public StatisticService(Context context, ILogger<StatisticService> logger, IConverter converter)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _converter = converter ?? throw new ArgumentNullException(nameof(converter));
        }

        public async Task<ServiceResponse<DashboardModel>> GetDashboard(string userId)
        {
            try
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
                var expens = await _context.Bill!.Where(b => b.Owner!.Id == userGuid).Where(x => x.Amount < 0).SumAsync(x => x.Amount);
                var income = await _context.Bill!.Where(b => b.Owner!.Id == userGuid).Where(x => x.Amount > 0).SumAsync(x => x.Amount);
                var expensThisMonth = await _context.Bill!.Where(b => b.Owner!.Id == userGuid).Where(x => x.CreatedDate.Month == DateTime.Now.Month && x.CreatedDate.Year == DateTime.Now.Year).Where(x => x.Amount < 0).SumAsync(x => x.Amount);
                var incomeThisMonth = await _context.Bill!.Where(b => b.Owner!.Id == userGuid).Where(x => x.CreatedDate.Month == DateTime.Now.Month && x.CreatedDate.Year == DateTime.Now.Year).Where(x => x.Amount > 0).SumAsync(x => x.Amount);
                var stats = await _context.Bill!.Where(b => b.Owner!.Id == userGuid && b.CreatedDate.Year == DateTime.Now.Year).GroupBy(x => x.CreatedDate.Month).Select(x => new { Month = x.Key, Amount = x.Sum(y => y.Amount) }).ToListAsync();

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
            catch (Exception ex)
            {
                return new ServiceResponse<DashboardModel>()
                {
                    IsSuccess = false,
                    Errors = new List<string>() { ex.Message }
                };
            }
        }

        public async Task<ServiceResponse<byte[]>> GetPdfStats(string userId, DateTime from, DateTime to)
        {
            try
            {
                Guid userGuid;
                var parseSuccess = Guid.TryParse(userId, out userGuid);
                if (!parseSuccess)
                {
                    return new ServiceResponse<byte[]>()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() { "UserId is not valid" }
                    };
                }
                var user = await _context.Users!.Where(x => x.Id == userGuid).FirstOrDefaultAsync();
                if (user == null)
                {
                    return new ServiceResponse<byte[]>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "User not found" }
                    };
                }

                var content = File.ReadAllText("Assets/stats.html");

                if (String.IsNullOrEmpty(content))
                {
                    return new ServiceResponse<byte[]>()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() { "Template is empty or don't exist" }
                    };
                }

                content = content.Replace("{{Nick}}", user.FirstName);
                content = content.Replace("{{dateStart}}", from.ToShortDateString());
                content = content.Replace("{{dateEnd}}", to.ToShortDateString());

                string tableToBuild = string.Empty;
                var billsNoPick = await _context.Bill!.Where(b => b.Owner!.Id == userGuid).Where(x => x.CreatedDate >= from && x.CreatedDate <= to).Include(x => x.Category).ToListAsync();
                var bills = billsNoPick.GroupBy(x => x.Category).ToList();
                foreach (var (bill, i) in bills.Select((bill, i) => (bill, i)))
                {
                    tableToBuild += "<tr>";
                    tableToBuild += $"<td>{i + 1}</td>";
                    tableToBuild += $"<td>{bill.Key.Name}</td>";
                    tableToBuild += $"<td>{bill.Sum(x => x.Amount).ToString("C", new CultureInfo("pl-PL"))}</td>";
                    tableToBuild += "</tr>";
                }

                content = content.Replace("{{tableContent}}", tableToBuild);

                var globalSettings = PdfConfiguration.ConfigureGlobal();
                var objectSettings = PdfConfiguration.ConfigureObjectSettings(content);

                var htmlToPdfDocument = new HtmlToPdfDocument()
                {
                    GlobalSettings = globalSettings,
                    Objects = { objectSettings },
                };

                var pdfFile = _converter.Convert(htmlToPdfDocument);

                return new ServiceResponse<byte[]>()
                {
                    IsSuccess = true,
                    Data = pdfFile
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<byte[]>()
                {
                    IsSuccess = false,
                    Errors = new List<string>() { ex.Message }
                };
            }
        }
    }
}

//  <tr>
//           <td>{{numer}}</td>
//           <td>{{kategoria}}</td>
//           <td>{{sumaRachunków}}</td>
//         </tr>
