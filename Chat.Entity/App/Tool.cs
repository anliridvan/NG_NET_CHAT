using Chat.Entity.Def;
using System.ComponentModel.DataAnnotations;

namespace Chat.Entity.App
{
    public class Tool : DBEntityExt<ToolExt>
    {

        [StringLength(15, MinimumLength = 5)]
        public string ToolName { get; set; } // Server

        // Status  Active / Passive / ReActivated / OnService / Expired / Closed
        // Abilities List // Chat / Share Ip Of 3rds (Maybe Some QR for Access or Public If...)/
        // Price List
        //              'Own'      - (Choosed Cheap 1 is the First Proggress Instantly) 
        //                              - Free which is close to Expire is first (No Waste Please) 
        //              'TimeBase' - If None If eliagable Cheap Usage 'TimeBase'- No Cheat the Customer like Zabka)

    }

    public class ToolExt
    {
        [StringLength(255)]
        public string Description { get; set; }
    }
}
