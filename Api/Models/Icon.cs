using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class Icon
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string className { get; set; }
    }
}