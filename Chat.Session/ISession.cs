using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chat.Session
{
    public interface ISession
    {
        Guid UserId { get; set; }
        Guid RoleId { get; set; }
        string UserName { get; set; }
        string RoleName { get; set; }
    }
}
