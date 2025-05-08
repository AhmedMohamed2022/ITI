// Token: 0x0600000C RID: 12 RVA: 0x000187E4 File Offset: 0x000169E4
.method public hidebysig specialname rtspecialname 
	instance void .ctor () cil managed 
{
	// Header Size: 12 bytes
	// Code Size: 81 (0x51) bytes
	.maxstack 2

	/* (12,9)-(12,26) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x000169F0 02           */ IL_0000: ldarg.0
	/* 0x000169F1 28AF00000A   */ IL_0001: call      instance void [Microsoft.Maui.Controls]Microsoft.Maui.Controls.ContentPage::.ctor()
	/* (14,13)-(14,35) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x000169F6 02           */ IL_0006: ldarg.0
	/* 0x000169F7 280E000006   */ IL_0007: call      instance void SimpleMAUI.MainPage::b()
	/* (16,13)-(16,51) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x000169FC 730F000006   */ IL_000C: newobj    instance void SimpleMAUI.MainPage/a::.ctor()
	/* (19,13)-(19,49) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x00016A01 25           */ IL_0011: dup
	/* 0x00016A02 2D25         */ IL_0012: brtrue.s  IL_0039

	/* 0x00016A04 2B00         */ IL_0014: br.s      IL_0016

	/* 0x00016A06 26           */ IL_0016: pop
	/* 0x00016A07 14           */ IL_0017: ldnull
	/* 0x00016A08 2B11         */ IL_0018: br.s      IL_002B
	// loop start (head: IL_002B)
		/* (21,17)-(21,46) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
		/* 0x00016A0A 02           */ IL_001A: ldarg.0
		/* 0x00016A0B 7B04000004   */ IL_001B: ldfld     class [Microsoft.Maui.Controls]Microsoft.Maui.Controls.Button SimpleMAUI.MainPage::b
		/* 0x00016A10 7239060070   */ IL_0020: ldstr     "works 1a"
		/* 0x00016A15 6FB000000A   */ IL_0025: callvirt  instance void [Microsoft.Maui.Controls]Microsoft.Maui.Controls.Button::set_Text(string)
		/* (hidden)-(hidden) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
		/* 0x00016A1A 2A           */ IL_002A: ret

		/* 0x00016A1B 724B060070   */ IL_002B: ldstr     "worksA"
		/* 0x00016A20 28B100000A   */ IL_0030: call      bool [System.Runtime]System.String::op_Equality(string, string)
		/* 0x00016A25 2C09         */ IL_0035: brfalse.s IL_0040

		/* 0x00016A27 2BE1         */ IL_0037: br.s      IL_001A
	// end loop

	/* 0x00016A29 7B05000004   */ IL_0039: ldfld     string SimpleMAUI.MainPage/a::a
	/* 0x00016A2E 2BEB         */ IL_003E: br.s      IL_002B

	/* (25,17)-(25,46) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x00016A30 02           */ IL_0040: ldarg.0
	/* 0x00016A31 7B04000004   */ IL_0041: ldfld     class [Microsoft.Maui.Controls]Microsoft.Maui.Controls.Button SimpleMAUI.MainPage::b
	/* 0x00016A36 7259060070   */ IL_0046: ldstr     "works 2a"
	/* 0x00016A3B 6FB000000A   */ IL_004B: callvirt  instance void [Microsoft.Maui.Controls]Microsoft.Maui.Controls.Button::set_Text(string)
	/* (27,9)-(27,10) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x00016A40 2A           */ IL_0050: ret
} // end of method MainPage::.ctor
