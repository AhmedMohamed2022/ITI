using Microsoft.AspNetCore.SignalR.Client;
using System.Diagnostics;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WpfAppChatConsumer
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        HubConnection hub;
        public MainWindow()
        {
            InitializeComponent();
            //Decalre Connect with each hub
            hub = new HubConnectionBuilder().WithUrl("http://localhost:5706/MyChat").Build();
            //start connection
            hub.StartAsync();
            
            

            //reciver message from Server "'Handel"
            hub.On<string, string>("NewMessageNotify", (n,m) => {
                Dispatcher.Invoke(() =>
                {
                    msgList.Items.Add($"{n} \t :\t {m}");
                });
            });
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            //send from client to server RPC
            string name=UserNameTxt.Text;
            string msg = UserMsgTxt.Text;
            hub.InvokeAsync("SendText",name,msg);
        }

    }
}