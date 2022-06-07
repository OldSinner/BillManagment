namespace Api.Models.Dtos.Bill
{
    public class BillDto
    {
        public string? Id { get; set; }
        public string Title { get; set; }
        public float Amount { get; set; }
        public string CategoryId { get; set; }
    }
}