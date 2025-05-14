namespace Store.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        //public string ImageUrl { get; set; }
        public int Quantity { get; set; }
        public ICollection<Comments> Comments { get; set; } = new List<Comments>();

    }
}
