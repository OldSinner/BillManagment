using System.ComponentModel.DataAnnotations;
using Api.Models.Dtos.Bill;

namespace Api.Models
{
    public class Bill
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        [Required]
        public User? Owner { get; set; } = new User();
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public float Amount { get; set; }
        [Required]
        public Category Category { get; set; } = new Category();
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModified { get; set; }


        public BillResponse ToBillResponse()
        {
            return new BillResponse()
            {
                Id = Id.ToString(),
                Title = Title,
                Amount = Amount,
                Category = Category,
                CreatedDate = CreatedDate,
                LastModified = LastModified
            };
        }
    }
}