namespace EShop.ViewModels
{
    public class CartItemVM
    {
        public int ID { get; set; }
        public int? Quantity { get; set; }
        public int ProductId { get; set; }
        public string ClientId { get; set; }
    }
}
