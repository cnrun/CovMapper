using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium.Remote;

namespace CovMap
{
    class Program
    {
        static void Main(string[] args)
        {
            new Program().start();
        }
        Program()
        {

        }
        private IWebDriver BrowserDriver;

        private void start()
        {
            String url = $"http://localhost:8080";
            initialize_SeleniumLocal();
            BrowserDriver.Navigate().GoToUrl(url);
            // WebDriverWait wait = new WebDriverWait(BrowserDriver, TimeSpan.FromSeconds(30));
            // BrowserDriver.FindElement(By.Id("images/WelcomeModalImage1.svg")).Click();
            BrowserDriver.FindElement(By.ClassName("MuiButton-label")).Click();
            BrowserDriver.FindElement(By.XPath("//img[contains(@src,'images/WelcomeModalImage2.svg')]")).Click();
            BrowserDriver.FindElement(By.ClassName("MuiButton-label")).Click();
            BrowserDriver.FindElement(By.XPath("//img[contains(@src,'images/WelcomeModalImage3.svg')]")).Click();
            BrowserDriver.FindElement(By.ClassName("MuiButton-label")).Click();
            var Text = BrowserDriver.FindElement(By.XPath("/html/body/div[3]/div[3]/div/div/div[1]/p")).Text;
            Console.WriteLine($"text in dialog: {Text}");
            if (!Text.Contains("regionales Risiko"))
            {
                throw new Exception("Postalnumber Dialog to not appears");
            }
            BrowserDriver.FindElement(By.XPath("/html/body/div[3]/div[3]/div/div/div[1]/button[2]/span[1]")).Click();
        }
        private void initialize_SeleniumLocal()
        {
            ChromeOptions Options = new ChromeOptions();
            // Options.AddArgument("--window-size=1300,15000");
            // Options.AddArgument("--headless");       
            Options.AddArgument("--window-size=1000,1000");
            // Options.AddArgument("--headless");       
            // Options for running chrome-driver in docker. And yes! It was a long way to fix this issue.
            // 
            // https://stackoverflow.com/a/50642913/281188
            Options.AddArgument("--disable-gpu");
            Options.AddArgument("--no-sandbox");            
            Options.AddArgument("--disable-dev-shm-usage");            
            Console.WriteLine($"start selenium local");
            BrowserDriver = new ChromeDriver(Options);
        }
        public void Dispose()
        {
            // Close Browser.
//            BrowserDriver.Quit();
        }
    }
}
