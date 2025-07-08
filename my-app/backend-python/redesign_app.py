import gradio as gr
from diffusers import StableDiffusionControlNetImg2ImgPipeline, ControlNetModel
from diffusers.utils import load_image
import torch, cv2
import numpy as np
from PIL import Image
import os
from huggingface_hub import login

# Securely load Hugging Face token from environment variable
HF_TOKEN = os.getenv("HF_TOKEN")
if not HF_TOKEN:
    raise ValueError("Please set the HF_TOKEN environment variable with your Hugging Face access token.")
login(HF_TOKEN)

# 1. Canny Edge Generator
def apply_canny(image):
    image = np.array(image)
    edges = cv2.Canny(image, 100, 200)
    edges = edges[:, :, None]
    edges = np.concatenate([edges] * 3, axis=2)
    return Image.fromarray(edges)

# 2. Load ControlNet and Pipeline
controlnet = ControlNetModel.from_pretrained(
    "lllyasviel/sd-controlnet-canny", torch_dtype=torch.float16
)
pipe = StableDiffusionControlNetImg2ImgPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5", controlnet=controlnet,
    torch_dtype=torch.float16
).to("cuda")

# 3. Redesign Logic
def redesign(image, prompt):
    image = image.convert("RGB").resize((512, 512))
    canny = apply_canny(image)

    enhanced_prompt = f"{prompt}, intricate detail, painted texture, vivid colors, symmetrical pattern, 4K product design"

    result = pipe(
        prompt=enhanced_prompt,
        image=image,
        control_image=canny,
        strength=0.7,  # allow more creativity
        guidance_scale=12.0,  # more focus on prompt
        num_inference_steps=40
    )
    return result.images[0]

# 4. Gradio UI
with gr.Blocks() as demo:
    gr.Markdown("## 🖌 Redesign Your Object (Preserve Shape, Add Details)")
    with gr.Row():
        with gr.Column():
            image_input = gr.Image(type="pil", label="Upload your object")
            prompt_input = gr.Textbox(label="Describe your redesign idea")
            submit_btn = gr.Button("Submit")
        with gr.Column():
            output_image = gr.Image(label="Redesigned Image")

    submit_btn.click(fn=redesign, inputs=[image_input, prompt_input], outputs=output_image)

demo.launch(debug=True, share=True) 