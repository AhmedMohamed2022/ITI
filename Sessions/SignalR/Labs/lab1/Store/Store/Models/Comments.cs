namespace Store.Models
{
    public class Comments
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
