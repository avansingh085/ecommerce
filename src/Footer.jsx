import ItemList from "./ItemList";
function Footer() {
  return (
    <footer class="bg-gray-900 text-gray-300 bottom-0">
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
            <h3 class="text-lg font-semibold text-white mb-4">About Us</h3>
            <p class="text-sm">We are a leading company dedicated to providing high-quality services and innovative solutions to meet our clients' needs.</p>
        </div>
        <div>
            <h3 class="text-lg font-semibold text-white mb-4">Contact Information</h3>
            <ul class="text-sm space-y-2">
                <li><span>Email:</span> support@example.com</li>
                <li><span>Phone:</span> +1 234 567 890</li>
                <li><span>Address:</span> 123 Main Street, City, Country</li>
            </ul>
        </div>

        <div>
            <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul class="text-sm space-y-2">
                <li><a href="#" class="hover:text-teal-400 transition duration-200">Home</a></li>
                <li><a href="#" class="hover:text-teal-400 transition duration-200">About</a></li>
                <li><a href="#" class="hover:text-teal-400 transition duration-200">Services</a></li>
                <li><a href="#" class="hover:text-teal-400 transition duration-200">Contact</a></li>
            </ul>
        </div>

        <div>
            <h3 class="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div class="flex space-x-4">
                <a href="#" class="text-white hover:text-blue-500 transition duration-200" aria-label="Facebook">
                    <i class="fab fa-facebook-square text-2xl"></i>
                </a>
                <a href="#" class="text-white hover:text-blue-400 transition duration-200" aria-label="Twitter">
                    <i class="fab fa-twitter-square text-2xl"></i>
                </a>
                <a href="#" class="text-white hover:text-pink-500 transition duration-200" aria-label="Instagram">
                    <i class="fab fa-instagram-square text-2xl"></i>
                </a>
                <a href="#" class="text-white hover:text-blue-700 transition duration-200" aria-label="LinkedIn">
                    <i class="fab fa-linkedin text-2xl"></i>
                </a>
            </div>
        </div>
    </div>

  
    <div class="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        &copy;
    </div>
</footer>

  );
}

export default Footer;
