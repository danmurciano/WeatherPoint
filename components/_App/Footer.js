function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer class="footer">
      <p> Copyright WeatherPoint © {year} </p>
    </footer>
  );
}

export default Footer;
