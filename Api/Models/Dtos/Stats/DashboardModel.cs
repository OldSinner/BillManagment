namespace Api.Models.Dtos.Stats
{
    public class DashboardModel
    {
        public float Income { get; set; }
        public float Outcome { get; set; }
        public float Balance { get; set; }
        public Dictionary<int, float> Monthly { get; set; } = new Dictionary<int, float>();
    }
}
