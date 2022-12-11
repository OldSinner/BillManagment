namespace Api.Models.Dtos.Bill
{
    public class BillDto
    {
        public string? Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public float Amount { get; set; }
        public string? CategoryId { get; set; }
        public DateTime Date { get; set; }
    }
}