// Token: 0x06000009 RID: 9 RVA: 0x00018500 File Offset: 0x00016700
.method public hidebysig specialname rtspecialname 
	instance void .ctor () cil managed 
{
	// Header Size: 12 bytes
	// Code Size: 73 (0x49) bytes
	// LocalVarSig Token: 0x11000005 RID: 5
	.maxstack 2
	.locals init (
		[0] class SimpleMAUI.MainPage/TestClass testclass
	)

	/* (12,9)-(12,26) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x0001670C 02           */ IL_0000: ldarg.0
	/* 0x0001670D 28AC00000A   */ IL_0001: call      instance void [Microsoft.Maui.Controls]Microsoft.Maui.Controls.ContentPage::.ctor()
	/* (14,13)-(14,35) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x00016712 02           */ IL_0006: ldarg.0
	/* 0x00016713 280B000006   */ IL_0007: call      instance void SimpleMAUI.MainPage::InitializeComponent()
	/* (16,13)-(16,51) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x00016718 730C000006   */ IL_000C: newobj    instance void SimpleMAUI.MainPage/TestClass::.ctor()
	/* 0x0001671D 0A           */ IL_0011: stloc.0
	/* (19,13)-(19,69) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x0001671E 06           */ IL_0012: ldloc.0
	/* 0x0001671F 2C23         */ IL_0013: brfalse.s IL_0038

	/* 0x00016721 06           */ IL_0015: ldloc.0
	/* 0x00016722 7B03000004   */ IL_0016: ldfld     string SimpleMAUI.MainPage/TestClass::mystring
	/* 0x00016727 7239060070   */ IL_001B: ldstr     "worksA"
	/* 0x0001672C 28AD00000A   */ IL_0020: call      bool [System.Runtime]System.String::op_Equality(string, string)
	/* 0x00016731 2C11         */ IL_0025: brfalse.s IL_0038

	/* (21,17)-(21,46) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x00016733 02           */ IL_0027: ldarg.0
	/* 0x00016734 7B02000004   */ IL_0028: ldfld     class [Microsoft.Maui.Controls]Microsoft.Maui.Controls.Button SimpleMAUI.MainPage::CounterBtn
	/* 0x00016739 7247060070   */ IL_002D: ldstr     "works 1a"
	/* 0x0001673E 6FAE00000A   */ IL_0032: callvirt  instance void [Microsoft.Maui.Controls]Microsoft.Maui.Controls.Button::set_Text(string)
	/* (hidden)-(hidden) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x00016743 2A           */ IL_0037: ret

	/* (25,17)-(25,46) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x00016744 02           */ IL_0038: ldarg.0
	/* 0x00016745 7B02000004   */ IL_0039: ldfld     class [Microsoft.Maui.Controls]Microsoft.Maui.Controls.Button SimpleMAUI.MainPage::CounterBtn
	/* 0x0001674A 7259060070   */ IL_003E: ldstr     "works 2a"
	/* 0x0001674F 6FAE00000A   */ IL_0043: callvirt  instance void [Microsoft.Maui.Controls]Microsoft.Maui.Controls.Button::set_Text(string)
	/* (27,9)-(27,10) C:\Users\Administrator\source\repos\SimpleMAUI\MainPage.xaml.cs */
	/* 0x00016754 2A           */ IL_0048: ret
} // end of method MainPage::.ctor
