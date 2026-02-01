import { useRef, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import style from './RSVP.module.scss'
import { HCaptcha } from '@hcaptcha/react-hcaptcha';

type GuestPrefix = 'guest1' | 'guest2';
type Course = 'Starter' | 'Main' | 'Dessert';
type MealFieldName = `${GuestPrefix}${Course}`;

type FormValues = {
  attendance: '' | 'yes' | 'no';
  partySize: '1' | '2';
  guest1Name: string;
  guest1Email: string;
  guest1Starter: string;
  guest1Main: string;
  guest1Dessert: string;
  guest2Name?: string;
  guest2Starter?: string;
  guest2Main?: string;
  guest2Dessert?: string;
  dietaryNotes?: string;
  'h-captcha-response': string;
};

const RSVP = () => {
  const [formState, setFormState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const formRef = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit, watch, setValue, formState: rhfState, setFocus } = useForm<FormValues>({
    defaultValues: {
      attendance: '',
      partySize: '1',
      ['h-captcha-response']: '',
    },
    mode: 'onChange',
    shouldUseNativeValidation: true,
    shouldUnregister: true,
    shouldFocusError: true,
  }); 


  const isLoading = formState === 'loading';
  const { errors, touchedFields, isSubmitted, isValid } = rhfState;
  const attendance = watch('attendance');
  const partySize = watch('partySize');
  const guest1Name = watch('guest1Name');
  const guest2Name = watch('guest2Name');

  const shouldShowError = (field: keyof FormValues) =>
    Boolean(errors[field]) && (touchedFields[field] || isSubmitted);

  const FieldError = ({ show, message }: { show: boolean; message: string }) =>
    show ? <span className={style.fieldError} role="alert">{message}</span> : null;

  const starterOptions = [
    { label: "Homemade soup", value: "starter_soup" },
    { label: "Melon, Parma ham and mozzarella", value: "starter_melon_parma_mozzarella" },
    { label: "Oak smoked salmon, potato, caper, lemon & parsley salad, citrus dressing, granary bread roll", value: "starter_salmon_salad" },
  ];

  const mainCourseOptions = [
    { label: "Roast sirloin of Yorkshire beef, Yorkshire pudding, duck fat roasted potatoes, carrot purée and red wine sauce", value: "main_yorkshire_beef" },
    { label: "Roast chicken breast, saffron cous cous, chargrilled vegetables, pomegranate and local honey jus", value: "main_roast_chicken" },
    { label: "Bowland ale sausages, champ mash, crispy shallot onion rings and rich ale gravy", value: "main_bowland_sausages" },
  ];

  const dessertOptions = [
    { label: "Salted caramel chocolate brownie with clotted cream ice cream", value: "dessert_chocolate_brownie" },
    { label: "Raspberry and white chocolate cheesecake, summer berry compote", value: "dessert_raspberry_cheesecake" },
  ];

  const key = "8da3f5f0-a18d-4551-8219-6ab0900c60a4";

  const renderRadioGroup = (
    name: MealFieldName,
    options: { label: string; value: string }[],
    isRequired = true
  ) => (
    <div className={style.radioGroup}>
      {options.map((option) => (
        <label key={option.value} className={style.radioOption}>
          <input
            type="radio"
            value={option.value}
            {...register(name, { required: isRequired })}
            required={isRequired}
            disabled={isLoading}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );

  const renderMealSection = (
    guestLabel: string,
    fieldPrefix: GuestPrefix,
    isRequired = true
  ) => (
    <div className={style.mealSection}>
      <p>{guestLabel} meal selections</p>
      <div className={style.mealGroup}>
        <p>Starter *</p>
        {renderRadioGroup(`${fieldPrefix}Starter`, starterOptions, isRequired)}
        <FieldError
          show={shouldShowError(`${fieldPrefix}Starter`)}
          message="Please choose a starter."
        />
      </div>
      <div className={style.mealGroup}>
        <p>Main course *</p>
        {renderRadioGroup(`${fieldPrefix}Main`, mainCourseOptions, isRequired)}
        <FieldError
          show={shouldShowError(`${fieldPrefix}Main`)}
          message="Please choose a main course."
        />
      </div>
      <div className={style.mealGroup}>
        <p>Dessert *</p>
        {renderRadioGroup(`${fieldPrefix}Dessert`, dessertOptions, isRequired)}
        <FieldError
          show={shouldShowError(`${fieldPrefix}Dessert`)}
          message="Please choose a dessert."
        />
      </div>
    </div>
  );

  const onSubmit = async () => {
    setFormState('loading');
    const formData = formRef.current ? new FormData(formRef.current) : new FormData();
    formData.append("access_key", key);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setFormState(data.success ? 'success' : 'error');
  };

  const onInvalid = (errors: FieldErrors<FormValues>) => {
    formRef.current?.reportValidity();
    const fieldOrder: (keyof FormValues)[] = [
      'guest1Name',
      'guest1Email',
      'attendance',
      'partySize',
      'guest1Starter',
      'guest1Main',
      'guest1Dessert',
      'guest2Name',
      'guest2Starter',
      'guest2Main',
      'guest2Dessert',
      'h-captcha-response',
    ];

    const firstInvalid = fieldOrder.find((field) => errors[field]);
    if (!firstInvalid || !formRef.current) return;

    if (firstInvalid === 'h-captcha-response') {
      const captcha = formRef.current.querySelector<HTMLElement>(`.${style.captcha}`);
      captcha?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const element = formRef.current.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.focus();
      return;
    }

    setFocus(firstInvalid);
  };


  const onHCaptchaChange = (token: string): void => {
    setValue("h-captcha-response", token);
  };



  return (
    <div className={`${style.RSVP} content`}>
      <h2>RSVP</h2>
      {
        formState === 'success' ? (
          <div className={style.successMessage}>
            <p>Thank you for sending your RSVP!</p>
            {
              attendance === 'yes' ? (
                <p>We look forward to celebrating with you, {guest1Name}{guest2Name ? ` and ${guest2Name}` : ''}!</p>
              ) : (
                <p>We're sorry you can't make it, but we appreciate you letting us know.</p>
              )
            }
          </div>
        ) : formState === 'error' ? (
          <div className={style.errorMessage}>
            <p>There was an error submitting your RSVP. Please try again later.</p>
          </div>
        ) : (


      <div className="body">
        <div className="copy">
          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className={style.form} ref={formRef}>
            {isLoading && (
              <div className={style.loadingOverlay} aria-hidden="true">
                <span className={style.loadingSpinner} />
              </div>
            )}

            <label>
              Guest 1 name *
              <input
                type="text"
                {...register('guest1Name', { required: true })}
                required
                disabled={isLoading}
                aria-invalid={Boolean(errors.guest1Name)}
              />
            </label>
            <FieldError show={shouldShowError('guest1Name')} message="Guest 1 name is required." />
            <label>
              Guest 1 email *
              <input
                type="email"
                {...register('guest1Email', { required: true })}
                required
                disabled={isLoading}
                aria-invalid={Boolean(errors.guest1Email)}
              />
            </label>
            <FieldError show={shouldShowError('guest1Email')} message="Guest 1 email is required." />
            <input type="hidden" {...register('h-captcha-response', { required: true })} />

            <div className={style.section}>
              <label>Will you be attending? *</label>
              <label className={style.inlineRadio}>
                <input
                  type="radio"
                  value="yes"
                  {...register('attendance', { required: true })}
                  required
                  disabled={isLoading}
                />
                Yes
              </label>
              <label className={style.inlineRadio}>
                <input
                  type="radio"
                  value="no"
                  {...register('attendance', { required: true })}
                  required
                  disabled={isLoading}
                />
                No
              </label>
              <FieldError show={shouldShowError('attendance')} message="Please choose yes or no." />
            </div>

            {attendance === 'yes' && (
              <>
                <div className={style.section}>
                  <label>How many people are attending? *</label>
                  <label className={style.inlineRadio}>
                    <input
                      type="radio"
                      value="1"
                      {...register('partySize', { required: true })}
                      required
                      disabled={isLoading}
                    />
                    Just me
                  </label>
                  <label className={style.inlineRadio}>
                    <input
                      type="radio"
                      value="2"
                      {...register('partySize', { required: true })}
                      required
                      disabled={isLoading}
                    />
                    Two guests
                  </label>
                  <FieldError show={shouldShowError('partySize')} message="Please choose party size." />
                </div>

                <div className={style.section}>
                  <p>Meal selections (one starter, main and dessert per guest)</p>
                  {renderMealSection(guest1Name || "Guest 1", "guest1", true)}
                  {partySize === '2' && (
                    <>
                      <label>
                        Guest 2 name *
                        <input
                          type="text"
                          {...register('guest2Name', { required: partySize === '2' })}
                          required={partySize === '2'}
                          disabled={isLoading}
                          aria-invalid={Boolean(errors.guest2Name)}
                        />
                      </label>
                      <FieldError show={shouldShowError('guest2Name')} message="Guest 2 name is required." />
                      {renderMealSection(guest2Name! || "Guest 2", "guest2", partySize === '2')}
                    </>
                  )}
                </div>

                <label>
                  Dietary notes (allergies, restrictions, etc.)
                  <textarea
                    {...register('dietaryNotes')}
                    placeholder="Let us know anything we should pass along to catering"
                    disabled={isLoading}
                  />
                </label>
              </>
            )}

            <div className={style.captcha}>
              <HCaptcha
                sitekey={key}
                reCaptchaCompat={false}
                onVerify={onHCaptchaChange}
                size="invisible"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={style.submitButton}
            >
              Submit
            </button>
            {!isValid && isSubmitted && (
              <span className={style.fieldError} role="alert">Please complete the required fields above.</span>
            )}
          </form>
        </div>
      </div>
          )
      }
          </div>
  );
};

export default RSVP;
