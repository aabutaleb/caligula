import { ref, computed } from 'vue'

const translations = {
  en: {
    title: "Travel Interest Registration",
    subtitle: "Help us understand your travel needs and stay updated on our new product launch!",
    email: "Email Address *",
    emailPlaceholder: "your.email@example.com",
    travelStyle: "Travel Style",
    travelAlone: "I travel alone",
    travelWithChildren: "I travel with children",
    carRental: "Car Rental Habits",
    rentCars: "Yes, I rent cars at my destination",
    noRentCars: "No, I don't rent cars",
    equipmentApp: "Children's Equipment App Interest",
    equipmentAppInterest: "I'd be interested in using a separate app to book children's equipment during my trip",
    equipmentTypes: "What equipment would you be interested in? (optional)",
    equipmentPlaceholder: "e.g., car seats, strollers, cribs, high chairs, baby monitors...",
    submitButton: "Register Interest",
    successTitle: "Thank you for your interest!",
    successMessage: "We've received your registration and will keep you updated on our product launch.",
    languageToggle: "Español",
    required: "This field is required",
    invalidEmail: "Please enter a valid email address"
  },
  es: {
    title: "Registro de Interés de Viaje",
    subtitle: "¡Ayúdanos a entender tus necesidades de viaje y mantente actualizado sobre el lanzamiento de nuestro nuevo producto!",
    email: "Dirección de Email *",
    emailPlaceholder: "tu.email@ejemplo.com",
    travelStyle: "Estilo de Viaje",
    travelAlone: "Viajo solo/a",
    travelWithChildren: "Viajo con niños",
    carRental: "Hábitos de Alquiler de Coches",
    rentCars: "Sí, alquilo coches en mi destino",
    noRentCars: "No, no alquilo coches",
    equipmentApp: "Interés en App de Equipamiento Infantil",
    equipmentAppInterest: "Me interesaría usar una app separada para reservar equipamiento infantil durante mi viaje",
    equipmentTypes: "¿Qué equipamiento te interesaría? (opcional)",
    equipmentPlaceholder: "ej., sillas de coche, carritos, cunas, tronas, monitores de bebé...",
    submitButton: "Registrar Interés",
    successTitle: "¡Gracias por tu interés!",
    successMessage: "Hemos recibido tu registro y te mantendremos informado sobre el lanzamiento de nuestro producto.",
    languageToggle: "English",
    required: "Este campo es obligatorio",
    invalidEmail: "Por favor ingresa una dirección de email válida"
  }
}

// Create a reactive language state
const currentLanguage = ref(localStorage.getItem('preferredLanguage') || 'en')

// Create a computed property for translations
export const t = computed(() => {
  return (key) => {
    return translations[currentLanguage.value][key] || translations.en[key] || key
  }
})

// Function to change language
export const setLanguage = (lang) => {
  currentLanguage.value = lang
  localStorage.setItem('preferredLanguage', lang)
}

// Get current language
export const getCurrentLanguage = () => currentLanguage.value

// Get available languages
export const getAvailableLanguages = () => Object.keys(translations) 