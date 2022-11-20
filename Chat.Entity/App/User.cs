using Chat.Entity.Def;
using System.ComponentModel.DataAnnotations;

namespace Chat.Entity.App
{
    public class User : DBEntityExt<UserExt>
    {

        [StringLength(15, MinimumLength = 5)]
        public string UserName { get; set; }
        public byte[] Password { get; set; }

    }

    public class UserExt
    {
        [StringLength(255)]
        public string Email { get; set; }
    }


}
