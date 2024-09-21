const Footer = () => {
  return (
    <footer className="bg-secondary text-text py-4 sticky bottom-0 z-50 h-18">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;