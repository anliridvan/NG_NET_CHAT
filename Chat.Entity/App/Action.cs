using Chat.Entity.Def;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chat.Entity.App
{
    public class Action : DBEntityExt<ActionExt>
    {

        [StringLength(15, MinimumLength = 5)]
        public string ActionName { get; set; }

        // Status  Active / Passive / ReActivated / OnService / Expired / Closed
        // Category  // Comunicate -> ConnectOnServer -> (1 - 1 / 1 - N / 1 - 0)
        // Cost?      // FreeService - TimeBased (Rent for a random while) Random Start End -  Own (Subcription for a periot) Fix Start End and Prepaid
        // ActionStartTime
        // ActionEndTime


    }

    public class ActionExt
    {
        [StringLength(255)]
        public string Email { get; set; }
    }
}
