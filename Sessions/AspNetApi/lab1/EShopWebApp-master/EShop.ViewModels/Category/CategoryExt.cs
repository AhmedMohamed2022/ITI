using EF_Core.Models;
using EShop.ViewModels.Category;

namespace EShop.ViewModels
{
    public static class CategoryExt
    {
        public static EF_Core.Models.Category ToModel(this AddCategoryViewModel viewModel)
        {
            //List<ProductAttachment> tmp = new List<ProductAttachment>();
            //foreach (string path in viewModel.Paths)
            //{
            //    tmp.Add(new ProductAttachment() { Image = path });
            //}

            return new EF_Core.Models.Category
            {
                Name = viewModel.Name,
                Description = viewModel.Description
            };
        }
        public static AddCategoryViewModel ToDetailsVModel(this EF_Core.Models.Category viewModel)
        {
            return new AddCategoryViewModel
            {
                Name = viewModel.Name,
                Description = viewModel.Description
            };

        }
    }
}