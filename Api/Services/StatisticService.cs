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

    }
}