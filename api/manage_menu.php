<?php
require_once 'db.php';

// Ambil semua menu
$stmt = $pdo->query("SELECT * FROM tb_botmenu ORDER BY parent_id, id");
$menus = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Handle Create / Update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? '';
    $parent_id = $_POST['parent_id'] ?: null;
    $keyword = trim($_POST['keyword']);
    $description = trim($_POST['description']);
    $url = trim($_POST['url']);

    if ($id) {
        $stmt = $pdo->prepare("UPDATE tb_botmenu SET parent_id = ?, keyword = ?, description = ?, url = ? WHERE id = ?");
        $stmt->execute([$parent_id, $keyword, $description, $url, $id]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO tb_botmenu (parent_id, keyword, description, url) VALUES (?, ?, ?, ?)");
        $stmt->execute([$parent_id, $keyword, $description, $url]);
    }

    header("Location: manage_menu.php");
    exit;
}

// Handle Delete
if (isset($_GET['delete'])) {
    $stmt = $pdo->prepare("DELETE FROM tb_botmenu WHERE id = ?");
    $stmt->execute([$_GET['delete']]);
    header("Location: manage_menu.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Manajemen Menu Bot</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    function openModal(data = {}) {
      document.getElementById('modal').classList.remove('hidden');
      document.getElementById('id').value = data.id || '';
      document.getElementById('parent_id').value = data.parent_id || '';
      document.getElementById('keyword').value = data.keyword || '';
      document.getElementById('description').value = data.description || '';
      document.getElementById('url').value = data.url || '';
    }
    function closeModal() {
      document.getElementById('modal').classList.add('hidden');
    }
  </script>
</head>
<body class="bg-gray-100 p-6">

  <div class="max-w-5xl mx-auto bg-white shadow p-6 rounded-xl">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">📋 Daftar Menu Bot</h2>
      <button onclick="openModal()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Tambah</button>
    </div>
    <table class="w-full table-auto border border-gray-300 text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-2 py-1 text-left">ID</th>
          <th class="border px-2 py-1 text-left">Parent</th>
          <th class="border px-2 py-1 text-left">Keyword</th>
          <th class="border px-2 py-1 text-left">Deskripsi</th>
          <th class="border px-2 py-1 text-left">URL</th>
          <th class="border px-2 py-1 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($menus as $m): ?>
          <tr class="hover:bg-gray-50">
            <td class="border px-2 py-1"><?= $m['id'] ?></td>
            <td class="border px-2 py-1"><?= $m['parent_id'] ?? '—' ?></td>
            <td class="border px-2 py-1 font-mono"><?= htmlspecialchars($m['keyword']) ?></td>
            <td class="border px-2 py-1"><?= htmlspecialchars($m['description']) ?></td>
            <td class="border px-2 py-1 truncate"><?= htmlspecialchars($m['url']) ?></td>
            <td class="border px-2 py-1 text-center space-x-2">
              <button onclick='openModal(<?= json_encode($m) ?>)' title="Edit" class="text-blue-600 hover:text-blue-800">
                ✏️
              </button>
              <a href="?delete=<?= $m['id'] ?>" onclick="return confirm('Yakin hapus menu ini?')" title="Hapus" class="text-red-600 hover:text-red-800">
                🗑️
              </a>
            </td>
          </tr>
        <?php endforeach ?>
      </tbody>
    </table>
  </div>

  <!-- Modal Form -->
  <div id="modal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center hidden">
    <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl relative">
      <h2 class="text-lg font-semibold mb-4">📝 Form Menu Bot</h2>
      <form method="POST" class="space-y-4">
        <input type="hidden" name="id" id="id">

        <div>
          <label class="block font-medium">Parent Menu</label>
          <select name="parent_id" id="parent_id" class="w-full p-2 border rounded">
            <option value="">-- Menu Utama --</option>
            <?php foreach ($menus as $menu): ?>
              <?php if ($menu['parent_id'] === null): ?>
                <option value="<?= $menu['id'] ?>">
                  <?= htmlspecialchars($menu['description']) ?> (<?= htmlspecialchars($menu['keyword']) ?>)
                </option>
              <?php endif; ?>
            <?php endforeach; ?>
          </select>
        </div>

        <div>
          <label class="block font-medium">Keyword</label>
          <input type="text" name="keyword" id="keyword" class="w-full p-2 border rounded" required>
        </div>

        <div>
          <label class="block font-medium">Deskripsi</label>
          <input type="text" name="description" id="description" class="w-full p-2 border rounded" required>
        </div>

        <div>
          <label class="block font-medium">URL (jika ada)</label>
          <input type="text" name="url" id="url" class="w-full p-2 border rounded">
        </div>

        <div class="flex justify-end space-x-2 pt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">Batal</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</body>
</html>
