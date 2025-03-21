using Microsoft.EntityFrameworkCore;
using SchoolModel;
using System.Linq.Expressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Shool.Managers
{
    public class BaseManager<T> where T :class
    {
        public readonly SchoolContext context;
        private DbSet<T> table;
        public BaseManager()
        {
            context = new SchoolContext();
            table = context.Set<T>();
        }

        public IQueryable<T> Get(Expression<Func<T,bool>> filter=null,int pageNumber=1,int pageSize=4)
        {
            IQueryable<T> query = table.AsQueryable();
            if (filter != null)
                query = query.Where(filter);

            if (pageNumber < 1)
                pageNumber = 1;
            if (pageSize < 0)
                pageSize = 4;
            int count = query.Count();
            if(pageSize>count)
            {
                pageSize = count;
                pageNumber = 1;
            }
            int skipTo =(pageNumber-1)*pageSize;
            query = query.Skip(skipTo).Take(pageSize);

            return query;
        }
        public IQueryable<T> GetList(Expression<Func<T, bool>> filter = null)
        {
            IQueryable<T> query = table.AsQueryable();
            if (filter!=null)
                query = query.Where(filter);
            return query;
        }
        public void Add(T newRow)
        {
            table.Add(newRow);
            context.SaveChanges();
        }
        public void Edit(T newRow)
        {
            table.Update(newRow);
            context.SaveChanges();
        }

        public void Delete(T row)
        {
            table.Remove(row);
            context.SaveChanges();
        }

    }
}
