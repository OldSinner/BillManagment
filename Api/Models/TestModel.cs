using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class TestModel
    {
        [Key]
        [Required]
        public string Test { get; set; }
    }
}