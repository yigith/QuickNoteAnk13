using Microsoft.EntityFrameworkCore;

namespace QuickNoteApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Note> Notes => Set<Note>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Note>().HasData(
                new Note() { Id = 1, Title = "Meeting Agenda", Content = "Discuss project updates and assign tasks." },
                new Note() { Id = 2, Title = "Grocery List", Content = "Buy milk, eggs, bread, and vegetables." },
                new Note() { Id = 3, Title = "Book Recommendations", Content = "Read 'The Alchemist' and 'The Silent Patient'." },
                new Note() { Id = 4, Title = "Travel Itinerary", Content = "Flight at 2:00 PM, hotel check-in at 4:00 PM." }
            );

        }
    }
}
