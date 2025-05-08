namespace SimpleMAUI
{
    public partial class MainPage : ContentPage
    {
        class TestClass
        {
            public string mystring = null;
        }

        int count = 0;

        public MainPage()
        {
            InitializeComponent();

            TestClass testclass = new TestClass();

            // Fails to work
            if (testclass != null && testclass.mystring == "worksA")
            {
                CounterBtn.Text = "works 1a";
            }
            else
            {
                CounterBtn.Text = "works 2a";
            }
        }

        private void OnCounterClicked(object sender, EventArgs e)
        {
            count++;

            if (count == 1)
                CounterBtn.Text = $"Clicked {count} time";
            else
                CounterBtn.Text = $"Clicked {count} times";

            SemanticScreenReader.Announce(CounterBtn.Text);
        }
    }

}
