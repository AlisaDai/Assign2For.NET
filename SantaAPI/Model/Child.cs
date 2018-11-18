using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SantaAPI.Model
{
    public class Child
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public int Latitude { get; set; }
        public int Longitude { get; set; }
        public Boolean IsNaughty { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
