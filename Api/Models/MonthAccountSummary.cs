using System.ComponentModel.DataAnnotations;
using Api.Models.Dtos.Bill;

namespace Api.Models
{
    public class MonthAccountSummary
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Year { get; set; }
        [Required]
        public string MonthName { get; set; }
        [Required]
        public float TotalIncome { get; set; }
        [Required]
        public float TotalExpense { get; set; }
        [Required]
        public float TotalBalance { get; set; }
    }
}