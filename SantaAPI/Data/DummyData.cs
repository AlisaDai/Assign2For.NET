using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using SantaAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SantaAPI.Data
{
    public class DummyData
    {
        public static async Task Initialize(IApplicationBuilder app,
                          UserManager<IdentityUser> userManager)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ChildContext>();
                context.Database.EnsureCreated();
                //context.Database.Migrate();

                //Look for the user
                if (await userManager.FindByNameAsync("santa") == null)
                {
                    var user = new IdentityUser
                    {
                        Email = "santa@np.com",
                        UserName = "santa",
                        SecurityStamp = Guid.NewGuid().ToString(),
                    };
                    var result = await userManager.CreateAsync(user, "P@$$w0rd");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, "Admin");
                    }
                }

                if (await userManager.FindByNameAsync("tim") == null)
                {
                    var user1 = new IdentityUser
                    {
                        Email = "tim@np.com",
                        UserName = "tim",
                        SecurityStamp = Guid.NewGuid().ToString(),
                    };
                    var result = await userManager.CreateAsync(user1, "P@$$w0rd");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user1, "Child");
                    }
                }

                // Look for any children
                if (!context.Children.Any())
                {
                    var children = GetChildren().ToArray();
                    context.Children.AddRange(children);
                    context.SaveChanges();
                }
            }
        }
        
        public static List<Child> GetChildren()
        {
            List<Child> children = new List<Child>()
            {
                new Child()
                {
                    FirstName = "First",
                    LastName = "Last",
                    BirthDate = new DateTime(2011, 11, 11),
                    Street = "3700 Willingdon Ave",
                    City = "Burnaby",
                    Province = "BC",
                    PostalCode = "V5G 3H2",
                    Country = "Canada",
                    Latitude = 49,
                    Longitude = -123,
                    IsNaughty = true,
                    DateCreated = DateTime.Now,
                }
            };
            return children;
        }
    }
}
