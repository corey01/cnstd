import { useRef, useState } from 'react';
import { type FieldErrors, useForm } from 'react-hook-form';
import style from './RSVP.module.scss';
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
  guest1DietaryNotes?: string;
  guest2Name?: string;
  guest2Starter?: string;
  guest2Main?: string;
  guest2Dessert?: string;
  guest2DietaryNotes?: string;
  songRequests?: string;
  'h-captcha-response': string;
};

const RSVP = () => {
  const [formState, setFormState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [submittedValues, setSubmittedValues] = useState<{
    attendance?: FormValues['attendance'];
    guest1Name?: string;
    guest2Name?: string;
  }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitDebug, setSubmitDebug] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const hcaptchaRef = useRef<any>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: rhfState,
    setFocus,
  } = useForm<FormValues>({
    defaultValues: {
      attendance: '',
      partySize: '1',
      ['h-captcha-response']: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
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
    show ? (
      <span className={style.fieldError} role="alert">
        {message}
      </span>
    ) : null;

  const starterOptions = [
    { label: 'Homemade Tomato & Basil soup', value: 'Starter Tomato Soup' },
    { label: 'Melon, Parma ham and mozzarella', value: 'Starter Melon Ham Mozzarella' },
    {
      label:
        'Oak smoked salmon, potato, caper, lemon & parsley salad, citrus dressing, granary bread roll',
      value: 'Starter Salmon Salad',
    },
  ];

  const mainCourseOptions = [
    {
      label:
        'Roast sirloin of Yorkshire beef, Yorkshire pudding, duck fat roasted potatoes, carrot purée and red wine sauce',
      value: 'Main Yorkshire Beef',
    },
    {
      label:
        'Roast chicken breast, saffron cous cous, chargrilled vegetables, pomegranate and local honey jus',
      value: 'Main Roast Chicken',
    },
    {
      label: 'Bowland ale sausages, champ mash, crispy shallot onion rings and rich ale gravy',
      value: 'Main Bowland Sausages',
    },
  ];

  const dessertOptions = [
    {
      label: 'Salted caramel chocolate brownie with clotted cream ice cream',
      value: 'Dessert Chocolate Brownie',
    },
    {
      label: 'Raspberry and white chocolate cheesecake, summer berry compote',
      value: 'Dessert Raspberry Cheesecake',
    },
  ];

  const web3formsAccessKey = '8da3f5f0-a18d-4551-8219-6ab0900c60a4';

  const renderRadioGroup = (
    name: MealFieldName,
    options: { label: string; value: string }[],
    isRequired = true,
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

  const renderMealSection = (guestLabel: string, fieldPrefix: GuestPrefix, isRequired = true) => (
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
      <label className={style.dietryReqs}>
        Dietary notes (allergies, restrictions, etc.)
        <textarea
          {...register(`${fieldPrefix}DietaryNotes`)}
          placeholder="Let us know anything we should pass along to catering"
          disabled={isLoading}
          rows={2}
        />
      </label>
    </div>
  );

  const onSubmit = async (data: FormValues) => {
    setFormState('loading');
    setSubmitError(null);
    setSubmitDebug(null);
    setSubmittedValues({
      attendance: data.attendance,
      guest1Name: data.guest1Name,
      guest2Name: data.guest2Name,
    });
    let token = data['h-captcha-response'];
    if (!token && hcaptchaRef.current?.executeAsync) {
      token = await hcaptchaRef.current.executeAsync();
      setValue('h-captcha-response', token, { shouldValidate: true });
    }

    if (!token) {
      throw new Error('hCaptcha token is missing.');
    }
    const formData = formRef.current ? new FormData(formRef.current) : new FormData();
    formData.append('access_key', web3formsAccessKey);
    formData.set('h-captcha-response', token);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json().catch(() => null);
      setSubmitDebug(result ? JSON.stringify(result, null, 2) : null);

      if (!response.ok) {
        throw new Error(result?.message || `Request failed (${response.status})`);
      }

      if (!result?.success) {
        throw new Error(result?.message || 'Submission failed');
      }

      setFormState('success');
      hcaptchaRef.current?.resetCaptcha?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setSubmitError(message);
      setFormState('error');
    }
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

    const element = formRef.current.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.focus();
      return;
    }

    setFocus(firstInvalid);
  };

  const onHCaptchaChange = (token: string): void => {
    setValue('h-captcha-response', token);
  };

  return (
    <div className={style.RSVP}>
      <div className="content">
        <h2>RSVP</h2>
        {formState === 'success' ? (
          <div className={style.successMessage}>
            <p>Thank you for sending your RSVP!</p>
            {submittedValues.attendance === 'yes' ? (
              <p>
                We look forward to celebrating with you,{' '}
                <span>
                  {submittedValues.guest1Name}
                  {submittedValues.guest2Name ? ` and ${submittedValues.guest2Name}` : ''}
                </span>
                !
              </p>
            ) : (
              <p>We're sorry you can't make it, but we appreciate you letting us know.</p>
            )}
          </div>
        ) : formState === 'error' ? (
          <div className={style.errorMessage}>
            <p>There was an error submitting your RSVP. Please try again later.</p>
            {submitError && <p>{submitError}</p>}
            {submitError && <p>{JSON.stringify(submitError, null, 2)}</p>}
            {submitDebug && <pre>{submitDebug}</pre>}
          </div>
        ) : (
          <div className="body">
            <div className="copy">
              <form
                onSubmit={handleSubmit(onSubmit, onInvalid)}
                className={style.form}
                ref={formRef}
              >
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
                <FieldError
                  show={shouldShowError('guest1Name')}
                  message="Guest 1 name is required."
                />
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
                <FieldError
                  show={shouldShowError('guest1Email')}
                  message="Guest 1 email is required."
                />
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
                  <FieldError
                    show={shouldShowError('attendance')}
                    message="Please choose yes or no."
                  />
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
                        I'm bringing a plus one
                      </label>
                      <FieldError
                        show={shouldShowError('partySize')}
                        message="Please choose party size."
                      />
                    </div>

                    <div className={style.mealSelectionsFull}>
                      <div className={style.mealSelectionsInner}>
                        <div className={style.section}>
                          <p>Meal selections (one starter, main and dessert per guest)</p>
                          {renderMealSection(
                            guest1Name ? guest1Name + "'s" : 'Guest 1',
                            'guest1',
                            true,
                          )}
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
                              <FieldError
                                show={shouldShowError('guest2Name')}
                                message="Guest 2 name is required."
                              />
                              {renderMealSection(
                                guest2Name ? guest2Name + "'s" : 'Guest 2',
                                'guest2',
                                partySize === '2',
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={style.djSectionFull}>
                      <div className={style.djSectionInner}>
                        <label className={style.songRequest}>
                          Do you have any song requests?
                          <textarea
                            {...register('songRequests')}
                            placeholder={`Song #1 - Artist\nSong #2 - Artist\nSong #3 - Artist\nSong #4 - Artist`}
                            disabled={isLoading}
                            className={style.underlineInput}
                            rows={4}
                          />
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div className={style.captcha}>
                  <HCaptcha
                    sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                    reCaptchaCompat={false}
                    onVerify={onHCaptchaChange}
                    size="invisible"
                    ref={hcaptchaRef}
                  />
                </div>
                <button type="submit" disabled={isLoading} className={style.submitButton}>
                  Submit
                </button>
                {!isValid && isSubmitted && (
                  <span className={style.fieldError} role="alert">
                    Please complete the required fields above.
                  </span>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RSVP;
