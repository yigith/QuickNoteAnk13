namespace QuickNoteApi.Data
{
    public class Note
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string? Content { get; set; }
    }
}
