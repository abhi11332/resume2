import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';

const InputField = ({ label, name, register, required, errors, type = 'text', placeholder }) => (
  <div className="mb-5">
    <label className="block font-medium text-gray-800 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all"
      {...register(name, { required: `${label} is required` })}
    />
    {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
  </div>
);

const ResumeFile = () => {
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: '', contact: '', address: '', email: '', photo: null,
      facebook: '', instagram: '', linkedin: '', objective: '',
      experience: [''], education: [''],
       projects: [{ description: '', link: '' }]
    }
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: 'experience' });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: 'education' });
  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({ control, name: 'projects' });


  const onSubmit = (data) => setSubmittedData({ ...data, photo: photoPreview });

  const photoFile = watch('photo');
  useEffect(() => {
    if (photoFile && photoFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(photoFile[0]);
    }
  }, [photoFile]);

  const handleBack = () => setSubmittedData(null);

  if (submittedData) {
    // =================== RESUME PREVIEW ===================
    const data = submittedData;
    return (
      <div className="mt-10 bg-white p-8 shadow-lg rounded-lg max-w-3xl mx-auto text-gray-800">
        <div className="flex justify-between mb-6 border-b pb-4">
          <div>
            <h2 className="text-3xl font-bold text-blue-800">{data.name}</h2>
            <p className="mt-1"><strong>Contact:</strong> {data.contact}</p>
            <p><strong>Address:</strong> {data.address}</p>
            <p><strong>E-mail:</strong> {data.email}</p>
          </div>
          {data.photo && <img src={data.photo} alt="User" className="w-20 h-20 rounded-full object-cover border" />}
        </div>

        <div className="mb-6">
  <h3 className="text-xl font-semibold mb-4 text-blue-600">Social Profiles</h3>
  <ul className="space-y-2 text-base sm:text-lg">
    {data.facebook && (
      <li>
        <strong>Facebook:</strong>{' '}
        <a
          href={data.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline break-all"
        >
          {data.facebook}
        </a>
      </li>
    )}
    {data.instagram && (
      <li>
        <strong>Instagram:</strong>{' '}
        <a
          href={data.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline break-all"
        >
          {data.instagram}
        </a>
      </li>
    )}
    {data.linkedin && (
      <li>
        <strong>LinkedIn:</strong>{' '}
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline break-all"
        >
          {data.linkedin}
        </a>
      </li>
    )}
  </ul>
</div>


        {data.objective && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Objective</h3>
            <p className="text-gray-700">{data.objective}</p>
          </div>
        )}

        {data.experience.some(exp => exp.trim()) && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Experience</h3>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              {data.experience.map((exp, i) => exp && <li key={i}>{exp}</li>)}
            </ul>
          </div>
        )}

        {data.education.some(edu => edu.trim()) && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Education</h3>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              {data.education.map((edu, i) => edu && <li key={i}>{edu}</li>)}
            </ul>
          </div>
        )}

  {data.projects && data.projects.some(p => p.description || p.link) && (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2 text-blue-600">Projects</h3>
    <ul className="list-disc ml-5 space-y-2 text-gray-700">
      {data.projects.map((proj, i) => (
        (proj.description || proj.link) && (
          <li key={i}>
            {proj.description && <p className="font-medium">{proj.description}</p>}
            {proj.link && (
              <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">
                {proj.link}
              </a>
            )}
          </li>
        )
      ))}
    </ul>
  </div>
)}


        <div className="flex gap-4 mt-6">
          <button onClick={() => window.print()} className="bg-green-600 text-white px-6 py-2 rounded-md">Print</button>
          <button onClick={handleBack} className="bg-gray-400 text-white px-6 py-2 rounded-md">Back</button>
        </div>
      </div>
    );
  }

  // =================== RESUME FORM ===================
  return (
    <>
     <motion.h1 className="flex text-blue-400 text-center items-center justify-center font-bold text-2xl mt-4" initial={{
          scale:0}} animate={{scale:1}} transition={{duration:1}}>
          Resume Builder
          </motion.h1>
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gradient-to-br from-white to-blue-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div className="bg-white shadow-xl rounded-2xl p-6" initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2 className="text-2xl font-bold text-blue-700 mb-5">👤 Personal Information</h2>
        <InputField label="Full Name" name="name" register={register} required errors={errors} />
        <InputField label="Contact Number" name="contact" register={register} required errors={errors} />
        <InputField label="Address" name="address" register={register} required errors={errors} />
        <InputField label="Email ID" name="email" register={register} required errors={errors} type='email'/>

        <div className="mb-5">
          <label className="block font-medium text-gray-800 mb-1">Upload Photo</label>
          <input type="file" accept="image/*" className="w-full p-2 border border-gray-300 rounded-lg" {...register('photo', { required: 'Photo is required' })} />
          {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
          {photoPreview && <img src={photoPreview} alt="Preview" className="mt-3 w-24 h-24 rounded-full object-cover border" />}
        </div>

        <InputField label="Facebook Link" name="facebook" register={register} required errors={errors} />
        <InputField label="Instagram Link" name="instagram" register={register} required errors={errors} />
        <InputField label="LinkedIn Link" name="linkedin" register={register} required errors={errors} />
      </motion.div>

      <motion.div className="bg-white shadow-xl rounded-2xl p-6" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <h2 className="text-2xl font-bold text-yellow-700 mb-5">💼 Professional Information</h2>

        <div className="mb-5">
          <label className="block font-medium text-gray-800 mb-1">Objective</label>
          <textarea
            placeholder="Career objective"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 transition-all"
            {...register('objective', { required: 'Objective is required' })}
          />
          {errors.objective && <p className="text-red-500 text-sm mt-1">{errors.objective.message}</p>}
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Experience</h3>
          {expFields.map((item, index) => (
            <div key={item.id} className="flex gap-2 mb-2">
              <input
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                placeholder={`Experience #${index + 1}`}
                {...register(`experience.${index}`, { required: `Experience #${index + 1} is required` })}
              />
              {expFields.length > 1 && (
                <button type="button" onClick={() => removeExp(index)} className="text-red-500 font-bold">✕</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => appendExp('')} className="text-sm text-blue-600 font-medium hover:underline mt-1">+ Add Experience</button>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Education</h3>
          {eduFields.map((item, index) => (
            <div key={item.id} className="flex gap-2 mb-2">
              <input
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                placeholder={`Education #${index + 1}`}
                {...register(`education.${index}`, { required: `Education #${index + 1} is required` })}
              />
              {eduFields.length > 1 && (
                <button type="button" onClick={() => removeEdu(index)} className="text-red-500 font-bold">✕</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => appendEdu('')} className="text-sm text-blue-600 font-medium hover:underline mt-1">+ Add Education</button>
        </div>

 {/* Projects */}
<div className="mt-6">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Projects</h3>
  {projectFields.map((item, index) => (
    <div key={item.id} className="mb-4 border p-3 rounded-md bg-gray-50">
      <div className="mb-2">
        <label className="block font-medium text-gray-800 mb-1">Description</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder={`Project #${index + 1} description`}
          {...register(`projects.${index}.description`)} 
        />
      </div>
      <div>
        <label className="block font-medium text-gray-800 mb-1">Link</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder={`Project #${index + 1} link`}
          {...register(`projects.${index}.link`)} 
        />
      </div>
      {projectFields.length > 1 && (
        <button type="button" onClick={() => removeProject(index)} className="text-red-500 mt-2">✕ Remove</button>
      )}
    </div>
  ))}
  <button
    type="button"
    onClick={() => appendProject({ description: '', link: '' })}
    className="text-sm text-blue-600 font-medium hover:underline mt-2"
  >
    + Add Project
  </button>
</div>


      </motion.div>

      <div className="md:col-span-2 flex justify-center mt-6">
        <motion.button type="submit" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          🚀 Generate Resume
        </motion.button>
      </div>
    </motion.form>
    </>
  );
};

export default ResumeFile;
