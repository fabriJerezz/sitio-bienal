import { Phone, Mail, Globe, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#cfc9c4] text-gray-800">
      <div className="max-w-6xl mx-auto p-6 flex justify-between items-stretch">
        <div className="flex-1 space-y-2">
          <div className="font-bold">
            <h2 className="text-6xl pl-5">Bienal</h2>
            <h2 className="text-6xl pl-20">Chaco</h2>
          </div>
          <p className="pl-5 text-[20px]  uppercase tracking-widest text-primary-300 text-">
            Donde el arte toma forma
          </p>
        </div>
        <div className="w-px bg-gray-600 mx-8 ml-40"></div>
        <div className="flex-1 space-y-2 text-lg mt-2">
          <div className="flex items-center gap-3">
            <Phone className="w-6 h-6" />
            <span>123-456-7890</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6" />
            <a
              href="mailto:aurora@reallygreatsite.com"
              className="hover:underline"
            >
              aurora@reallygreatsite.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6" />
            <a
              href="https://www.reallygreatsite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              www.reallygreatsite.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6" />
            <span>123 Anywhere St., Any City</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
