<template>
  <div class="interest-form">
    <div class="header">
      <button @click="toggleLanguage" class="language-toggle" :title="getLanguageName()">
        {{ getFlagEmoji() }}
      </button>
      <h1>{{ t('title') }}</h1>
      <p>{{ t('subtitle') }}</p>
    </div>

    <form @submit.prevent="handleSubmit" v-if="!showSuccess">
      <div class="form-group">
        <label for="email">{{ t('email') }}</label>
        <input 
          type="email" 
          id="email" 
          v-model="formData.email" 
          :placeholder="t('emailPlaceholder')"
          required
          @blur="validateEmail"
        >
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label>{{ t('travelStyle') }}</label>
        <div class="radio-group">
          <div class="radio-option">
            <input 
              type="radio" 
              id="alone" 
              v-model="formData.travelStyle" 
              value="alone"
            >
            <label for="alone">{{ t('travelAlone') }}</label>
          </div>
          <div class="radio-option">
            <input 
              type="radio" 
              id="withChildren" 
              v-model="formData.travelStyle" 
              value="withChildren"
            >
            <label for="withChildren">{{ t('travelWithChildren') }}</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>{{ t('carRental') }}</label>
        <div class="radio-group">
          <div class="radio-option">
            <input 
              type="radio" 
              id="rentCars" 
              v-model="formData.carRental" 
              value="yes"
            >
            <label for="rentCars">{{ t('rentCars') }}</label>
          </div>
          <div class="radio-option">
            <input 
              type="radio" 
              id="noRentCars" 
              v-model="formData.carRental" 
              value="no"
            >
            <label for="noRentCars">{{ t('noRentCars') }}</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>{{ t('equipmentApp') }}</label>
        <div class="checkbox-group">
          <div class="checkbox-option">
            <input 
              type="checkbox" 
              id="equipmentApp" 
              v-model="formData.equipmentApp"
            >
            <label for="equipmentApp">{{ t('equipmentAppInterest') }}</label>
          </div>
        </div>

        <div v-if="formData.equipmentApp" class="conditional-field">
          <label for="equipmentTypes">{{ t('equipmentTypes') }}</label>
          <textarea 
            id="equipmentTypes" 
            v-model="formData.equipmentTypes" 
            :placeholder="t('equipmentPlaceholder')"
          ></textarea>
        </div>
      </div>

      <button type="submit" class="submit-btn">{{ t('submitButton') }}</button>
    </form>

    <div v-if="showSuccess" class="success-message">
      <h3>{{ t('successTitle') }}</h3>
      <p>{{ t('successMessage') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { t, setLanguage, getCurrentLanguage } from '../i18n.js'

const showSuccess = ref(false)
const errors = reactive({})

const formData = reactive({
  email: '',
  travelStyle: '',
  carRental: '',
  equipmentApp: false,
  equipmentTypes: ''
})

// Language configuration with flags and names
const languages = {
  es: {
    flag: '🇪🇸',
    name: 'Español'
  },
  en: {
    flag: '🇬🇧',
    name: 'English'
  }
}

const getFlagEmoji = () => {
  const currentLang = getCurrentLanguage()
  return languages[currentLang]?.flag || '🌐'
}

const getLanguageName = () => {
  const currentLang = getCurrentLanguage()
  return languages[currentLang]?.name || 'Language'
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email) {
    errors.email = t.value('required')
  } else if (!emailRegex.test(formData.email)) {
    errors.email = t.value('invalidEmail')
  } else {
    errors.email = ''
  }
}

const toggleLanguage = () => {
  const currentLang = getCurrentLanguage()
  const newLang = currentLang === 'en' ? 'es' : 'en'
  setLanguage(newLang)
}

const handleSubmit = () => {
  // Validate email
  validateEmail()
  
  if (errors.email) {
    return
  }

  // Here you would typically send the data to your backend
  console.log('Form data:', formData)
  
  // Show success message
  showSuccess.value = true
  
  // Reset form after 5 seconds
  setTimeout(() => {
    showSuccess.value = false
    Object.assign(formData, {
      email: '',
      travelStyle: '',
      carRental: '',
      equipmentApp: false,
      equipmentTypes: ''
    })
    errors.email = ''
  }, 5000)
}

// Update document title when component mounts
onMounted(() => {
  document.title = t.value('title')
})
</script>

<style scoped>
.interest-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  position: relative;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.language-toggle {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #667eea;
  background: white;
  color: #2c3e50;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.language-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  border-color: #764ba2;
}

.language-toggle:active {
  transform: scale(0.95);
}

.header h1 {
  color: #2c3e50;
  font-size: 2em;
  margin-bottom: 10px;
  font-weight: 600;
}

.header p {
  color: #7f8c8d;
  font-size: 1.1em;
  line-height: 1.5;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 0.95em;
}

.form-group input[type="email"],
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8f9fa;
  font-family: inherit;
}

.form-group input[type="email"]:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.radio-group {
  display: flex;
  gap: 20px;
  margin-top: 8px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-option input[type="radio"] {
  width: 18px;
  height: 18px;
  accent-color: #667eea;
}

.radio-option label {
  margin: 0;
  font-weight: 500;
  cursor: pointer;
}

.checkbox-group {
  margin-top: 8px;
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  cursor: pointer;
}

.checkbox-option input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #667eea;
}

.checkbox-option label {
  margin: 0;
  font-weight: 500;
  cursor: pointer;
}

.conditional-field {
  margin-top: 15px;
  padding-left: 26px;
  border-left: 3px solid #667eea;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

.success-message {
  text-align: center;
  color: #27ae60;
  background: #d5f4e6;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.error {
  color: #e74c3c;
  font-size: 0.9em;
  margin-top: 5px;
  display: block;
}

@media (max-width: 600px) {
  .interest-form {
    padding: 30px 20px;
    margin: 20px;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 10px;
  }
  
  .language-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }
}
</style> 