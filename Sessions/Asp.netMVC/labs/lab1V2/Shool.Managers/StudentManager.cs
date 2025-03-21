using SchoolModel.Models;
using StudentViewModel;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LinqKit;
using Microsoft.IdentityModel.Tokens;

namespace Shool.Managers
{
    public class StudentManager:BaseManager<Student>
    {
        public PaginationViewModel<StudentDetailsViewModel> Search(string searchText="",int pageNumber=1,int pageSize=4)
        {
            var builder = PredicateBuilder.New<Student>();
            var old = builder;

            if (!searchText.IsNullOrEmpty())
                builder = builder.And(s => s.Name.ToLower().Contains(searchText.ToLower()) || s.Email.ToLower().Contains(searchText.ToLower()));
            
            if (old == builder)
                builder = null;

            var count = base.GetList(builder).Count();

            var resultAfterPagination = base.Get(
                filter: builder,
                pageSize: pageSize,
                pageNumber: pageNumber)
                .Select(p => p.ToDetailsModel()).ToList();

            return new PaginationViewModel<StudentDetailsViewModel>
            {
                Data = resultAfterPagination,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Total = count
            };
        }
    }
}
